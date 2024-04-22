import { MinLength } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
class GetUserArgs {
  @Field({ nullable: true })
  email?: string;

  //   @Field({ defaultValue: '' })
  //   @MinLength(3)
  //   lastName: string;
}