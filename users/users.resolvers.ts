import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { ReportsService } from "../reports/reports.service";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import { InputType, Field } from '@nestjs/graphql';
import { Report } from "../reports/models/report.model-2";
import { PubSub } from 'graphql-subscriptions'

const pubSub = new PubSub();

@InputType()
export class updateAdminStatusInput {
  @Field()
  isAdmin: boolean;

  @Field()
  userId: number;
}

@Resolver(of => User)
export class UserResolver {
  constructor(
    private usersService: UsersService,
    private reportsService: ReportsService,
  ) { }

  @Query(returns => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(+id);

  }

  @Mutation(returns => User)
  async updateAdminStatus(@Args('updateAdminStatusData') updateAdminStatusData: updateAdminStatusInput) {
    const { isAdmin, userId } = updateAdminStatusData;
    return this.usersService.updateAdminStatus(userId, isAdmin);
  }

  @ResolveField('reports', returns => [User])
  async getReports(@Parent() user: User) {
    const { id } = user;
    return this.reportsService.findAll(); //by id
  }

  //Product Updates??? //COmment Added
  @Subscription(returns => Report, {
    name: 'commentAdded',
  })
  subscribeToReportAdded() {
    return pubSub.asyncIterator('commentAdded');
  }

}