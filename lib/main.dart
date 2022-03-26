import 'package:flutter/material.dart';
import 'package:kosoku/app/presentation/app.dart';
import 'package:kosoku/features/splash/utils/native_splash.dart';

void main() {
  NativeSplashScreen.preserveNativeSplash();
  runApp(App());
}
