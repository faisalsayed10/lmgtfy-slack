require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command("/lmgtfy", async ({ ack, body, client }) => {
  await ack();

  try {
    await client.chat.postEphemeral({
      channel: body.channel_id,
      user: body.user_id,
      text: `https://google.com/search?q=${body.text}`,
    });
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
