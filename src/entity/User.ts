import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', {  nullable: true })
  name?: string = 'TEST_USER';

  @Column('varchar')
  login?: string = 'test_user';

  @Column('varchar')
  password?: string = 'P@55w0rd';


  static toResponse(user: User | undefined): User | undefined {
    if (user !== undefined) {
      const { id, name, login } = user;
      return { id, name, login };
    }
    return undefined;
  }
}
