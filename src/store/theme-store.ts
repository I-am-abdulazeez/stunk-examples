import { chunk } from "stunk";

import { withPersistence } from "stunk/middleware";

export const themeChunk = withPersistence(chunk("light"), { key: 'theme' });
