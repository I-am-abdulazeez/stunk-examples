import { chunk } from 'stunk';
import { withHistory } from 'stunk/middleware';

export const counter = withHistory(chunk(0));
