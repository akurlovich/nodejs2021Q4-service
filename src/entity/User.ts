import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', {  nullable: true })
  name?: string;

  @Column('varchar')
  login?: string;

  @Column('varchar')
  password?: string;


  static toResponse(user: User | undefined): User | undefined {
    if (user !== undefined) {
      const { id, name, login } = user;
      return { id, name, login };
    }
    return undefined;
  }

  
}
