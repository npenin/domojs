import State from "../state.js";

export default async function (this: State, userName: string, password: string)
{
    this.userName = userName;
    await this.setSecret('password', password);
    await this.commit();
}