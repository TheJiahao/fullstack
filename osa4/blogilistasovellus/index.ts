import config = require("./utils/config");
import logger = require("./utils/logger");
import app = require("./app");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
