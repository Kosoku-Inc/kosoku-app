import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:kosoku/features/navigation/presentation/app_router.dart';

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Center(
              child: Text("Onboarding"),
            ),
            ElevatedButton(onPressed: () {
              AutoRouter.of(context).replace(const AuthRoute());
            }, child: const Text("To login"))
          ],
        )
    );
  }
}
