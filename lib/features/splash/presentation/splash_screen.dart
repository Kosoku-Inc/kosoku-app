import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:kosoku/core/presentation/app_logo/app_logo.dart';
import 'package:kosoku/features/navigation/presentation/app_router.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Future.delayed(const Duration(seconds: 5)).then((_) {
      AutoRouter.of(context).replace(const OnboardingRoute());
    });

    return Scaffold(
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Center(
              child: AppLogo(fontSize: 42),
            ),
          ],
        )
      );
  }
}
