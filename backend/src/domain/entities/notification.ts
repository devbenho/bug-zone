class Notification {
  constructor(
    public message: string,
    public userId: string,
    public read: boolean,
  ) {}
}

export { Notification };
