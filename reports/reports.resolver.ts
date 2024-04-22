import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Report } from "./models/report.model-2";
import { ReportsService } from "./reports.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { User } from "../users/models/user.model";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

@Resolver(of => Report)
export class UserResolver {
  constructor(
    private reportsService: ReportsService,
  ) { }

  @Query(returns => Report, { name: 'report' })
  async getReport(@Args('id', { type: () => Int }) id: number) {
    return this.reportsService.findOne(+id);
  }

  @Mutation(returns => Report)
  async addReport(
    @Args('report', { type: () => Report }) createReportDto: CreateReportDto,
    @Args('user', { type: () => User }) user: User,
  ) {
    const newComment = this.reportsService.create(createReportDto, user);
    pubSub.publish('commentAdded', { commentAdded: newComment });
    return newComment;
  }

}