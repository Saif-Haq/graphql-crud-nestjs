import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class User {
  @Field(type => Int)
  @IsEmail()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ defaultValue: true })
  isAdmin: boolean;


  @Field(type => [Report], { nullable: 'itemsAndList' })
  reports: Report[];

  //----------------------------------

  @AfterInsert()
  logInsert() {
    console.log("Inserted User with Id: ", this.id);
  }


  @AfterRemove()
  logRemove() {
    console.log("Removed User with Id: ", this.id);
  }


  @AfterUpdate()
  logUpdate() {
    console.log("Updated User with Id: ", this.id);
  }
}
