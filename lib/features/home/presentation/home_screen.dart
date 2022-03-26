import 'package:auto_route/auto_route.dart';
import 'package:expandable_bottom_sheet/expandable_bottom_sheet.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:kosoku/features/home/utils/maps_theme_loader.dart';

import '../../../core/utils/navigation/route_destination.dart';
import '../../navigation/presentation/app_router.dart';

final destinations = [
  const RouteDestination(
    route: ProfileRoute(),
    icon: Icons.source,
    label: 'Profile',
  ),
  const RouteDestination(
    route: PaymentMethodsRoute(),
    icon: Icons.person,
    label: 'Payment Methods',
  ),
  const RouteDestination(
    route: OrderHistoryRoute(),
    icon: Icons.person,
    label: 'Order History',
  ),
  const RouteDestination(
    route: SettingsRoute(),
    icon: Icons.settings,
    label: 'Settings',
  ),
  const RouteDestination(
    route: AuthRoute(),
    icon: Icons.settings,
    label: 'Logout'
  )
];

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return HomeState();
  }

}

class HomeState extends State<HomeScreen> {
  final scaffoldState = GlobalKey<ScaffoldState>();

  _onMapCreated(GoogleMapController controller) {
    getMapsStyle().then((value) => controller.setMapStyle(value));

    /*scaffoldState.currentState?.showBottomSheet((context) => Container(
      height: 300,
    ));*/
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ExpandableBottomSheet(
        background: GoogleMap(
          initialCameraPosition: const CameraPosition(target: LatLng(0, 0)),
          mapType: MapType.normal,
          onMapCreated: _onMapCreated,
        ),
        persistentContentHeight: 300,
        expandableContent: Container(
          height: MediaQuery.of(context).size.height - MediaQuery.of(context).viewPadding.top,
          decoration: const BoxDecoration(
            borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
            color: Colors.white,
            boxShadow: [],
          ),
        ),
      ),
      drawer: Drawer(
        child: ListView.builder(
          itemCount: destinations.length,
          itemBuilder: (context, index) {
            final destination = destinations[index];
            return ListTile(
              selected: AutoRouter.of(context).isRouteActive(destination.route.routeName),
              leading: Icon(destination.icon),
              title: Text(destination.label),
              onTap: () {
                // navigating to tapped destination
                if(destination.label == 'Logout') {
                  context.router.replace(destination.route);
                } else {
                  context.router.push(destination.route);
                }
              },
            );
          },
        ),
      ),
    );
  }
}
