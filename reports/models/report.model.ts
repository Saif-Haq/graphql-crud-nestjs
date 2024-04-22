import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Report {
  @Field()
  title: string;

  @Field(type => Int, { nullable: true })
  votes?: number;

  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Field()
  @IsString()
  model: string;

  @Field()
  @IsString()
  make: string;

  @Field(type => Int)
  @IsLongitude()
  lng: number;

  @Field()
  @IsLatitude()
  lat: number;

  @Field()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  // @ManyToOne(() => User, (user => user.reports))
  @Field()
  user: User;

  @Field()
  @IsNumber()
  @Min(0)
  @Max(899999)
  price: number;

  @Field({ defaultValue: false })
  approved: boolean;
}