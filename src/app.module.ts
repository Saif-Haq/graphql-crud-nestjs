import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Context } from 'vm';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>(
      {
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: false,
        subscriptions: {
          'graphql-ws': {
            onConnect: (context: Context) => {
              const { connectionParams, extra } = context;
              const authToken = connectionParams.authToken;
              if (!(authToken)) {
                throw new Error('Token is not valid');
              }
              // extract user information from token
              // const user = parseToken(authToken);
              // user validation will remain the same as in the example above
              // when using with graphql-ws, additional context value should be stored in the extra field
              extra.user = { user: {} };
            },
          },
        },
        context: ({ extra }) => {
          // you can now access your additional context value through the extra field
        },

        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      }
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
