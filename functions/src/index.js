import functions from 'firebase-functions';
import admin from 'firebase-admin';
import nodemailer from 'nodemailer';

admin.initializeApp();

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: functions.config().gmail,
});

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

export const onSongUpdate = functions.firestore.document('songs/{songId}').onUpdate(async ({ before, after }, context) => {
  const song = { ...after.data(), id: after.id };
  const usersBefore = Object.keys(before.data().users || {}).sort();
  const usersAfter = Object.keys(after.data().users || {}).sort();
  const addedUserIds = usersAfter.filter(u => usersBefore.indexOf(u) < 0);

  await Promise.all(addedUserIds.map(userId => sendShareNotification({ userId, song })));
});

async function sendShareNotification({ userId, song }) {
  const sharer = await getUser(song.owner);
  const user = await getUser(userId);

  try {
    await mailTransport.sendMail({
      from: '"Songbook" <phjardas@gmail.com>',
      to: `"${user.displayName}" <${user.email}>`,
      subject: `[Songbook] ${sharer.label} shared the song ${song.title} with you`,
      text: `Hello ${user.label},

${sharer.label} has shared a song with you: ${song.title} by ${song.author}.

Go check it out! https://songbook.jardas.de/songs/${song.id}`,
    });
  } catch (error) {
    console.warn('Error sending mail to %s:', user.email, error);
  }
}

async function getUser(userId) {
  const doc = await firestore
    .collection('users')
    .doc(userId)
    .get();
  if (!doc) throw new Error(`User not found: ${userId}`);
  return { ...doc.data(), id: doc.id };
}
