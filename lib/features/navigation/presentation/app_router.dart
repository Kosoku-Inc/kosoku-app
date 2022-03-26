import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:kosoku/features/auth/presentation/screens/login_screen.dart';
import 'package:kosoku/features/auth/presentation/screens/register_screen.dart';
import 'package:kosoku/features/home/presentation/home_screen.dart';
import 'package:kosoku/features/onboarding/presentation/onbarding_screen.dart';
import 'package:kosoku/features/order_history/presentation/order_history_screen.dart';
import 'package:kosoku/features/payment_methods/presentation/payment_methods_screen.dart';
import 'package:kosoku/features/profile/presentation/profile_screen.dart';
import 'package:kosoku/features/settings/presentation/settings_screen.dart';
import 'package:kosoku/features/splash/presentation/splash_screen.dart';

part 'app_router.gr.dart';

@MaterialAutoRouter(
  replaceInRouteName: 'Screen,Route',
  routes: <AutoRoute>[
    AutoRoute(page: SplashScreen, initial: true),
    CustomRoute(
      page: OnboardingScreen,
      transitionsBuilder: TransitionsBuilders.fadeIn
    ),
    CustomRoute(
      name: "AuthRoute",
      page: EmptyRouterScreen,
      transitionsBuilder: TransitionsBuilders.fadeIn,
      children: [
        AutoRoute(page: LoginScreen, initial: true),
        AutoRoute(page: RegisterScreen),
      ]
    ),
    CustomRoute(
      name: "MainRoute",
      page: EmptyRouterScreen,
      transitionsBuilder: TransitionsBuilders.slideBottom,
      children: [
        AutoRoute(page: HomeScreen, initial: true),
        AutoRoute(page: ProfileScreen),
        AutoRoute(page: PaymentMethodsScreen),
        AutoRoute(page: OrderHistoryScreen),
        AutoRoute(page: SettingsScreen)
      ]
    ),
  ],
)
class AppRouter extends _$AppRouter{}
