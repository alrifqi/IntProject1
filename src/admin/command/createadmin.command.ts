import { Console, Command, createSpinner } from 'nestjs-console';
import { AuthAdminService } from '../service/auth.service';

@Console()
export class AdminCreateUserCommand {
  constructor(
    private authAdminService: AuthAdminService
  ){}
  @Command({
      command: 'useradmin',
      options: [
        {
          flags: '-e, --email <email>',
          description: 'email',
          required: true,
        },
        {
          flags: '-p, --password <password>',
          description: 'password',
          required: true,
        }
      ]
  })
  async createuser(param, options): Promise<void> {
    const spinner = createSpinner({}).start();
    spinner.color = 'yellow';
    spinner.text = 'create new user'
    await this.authAdminService.createAdminUser(param.email, param.password)
    spinner.stop();
  }
}