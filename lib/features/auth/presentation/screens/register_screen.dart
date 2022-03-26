import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Center(
              child: Text("Register"),
            ),
            ElevatedButton(onPressed: () {
              AutoRouter.of(context).navigateBack();
            }, child: const Text("To login"))
          ],
        )
    );
  }
}
