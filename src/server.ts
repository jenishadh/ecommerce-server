import app from './app';

import * as Config from './config';

app.listen(Config.port, () => {
  console.log(`Server running on port ${Config.port}`);
});
