export class User {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly slackUserId: string
  ) {}
}
