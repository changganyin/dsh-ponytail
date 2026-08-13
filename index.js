import { FULL_INSTRUCTIONS } from './instructions.js';

export const name = 'dsh-ponytail';
export const inject = ['systemPrompt'];

export function apply(ctx) {
  ctx.systemPrompt.section({
    name: 'policy:ponytail',
    order: 10,
    text: FULL_INSTRUCTIONS,
  });
}
