import 'package:flutter/material.dart';
import 'package:kosoku/features/navigation/presentation/app_router.dart';

import '../../core/utils/style/themes.dart';

class App extends StatelessWidget {
  final _appRouter = AppRouter();

  App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routeInformationParser: _appRouter.defaultRouteParser(),
      routerDelegate: _appRouter.delegate(),
      debugShowCheckedModeBanner: false,
      theme: Themes.lightTheme,
    );
  }

}
