import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Expose, Transform } from "class-transformer";
import { PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class Report {
  @Field(type => Int)
  price: number;

  @Field(type => Int) year: number;

  @Field()
  model: string;

  @Field()
  make: string;

  @Field(type => Int)
  lng: number;

  @Field(type => Int)
  lat: number;

  @Field(type => Int)
  mileage: number;

  @Field(type => Int)
  @Transform(({ obj }) => obj.user.id)
  userId: number;

  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  approved: boolean;
}
