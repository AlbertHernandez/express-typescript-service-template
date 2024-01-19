process.on("uncaughtException", error => {
  console.error(error);
  process.exit(1);
});
