import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:kosoku/features/navigation/presentation/app_router.dart';

class LoginScreen extends StatelessWidget {
  LoginScreen({Key? key}) : super(key: key) {
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.light);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Center(
              child: Text("Login"),
            ),
            ElevatedButton(onPressed: () {
              AutoRouter.of(context).replace(const MainRoute());
            }, child: const Text("Login")),
            ElevatedButton(onPressed: () {
              AutoRouter.of(context).push(const RegisterRoute());
            }, child: const Text("Register"))
          ],
        )
    );
  }
}
