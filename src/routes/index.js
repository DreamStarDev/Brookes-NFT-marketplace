import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../pages/home/";
import Admin from "../pages/admin/";
import Buyer from "../pages/buyer";
import FOffers from "../pages/offers/offers";
import OfferDetail from "../pages/offers/offerDetail";
import Seller from "../pages/seller";
import newBuyer from "../pages/newBuyer";
import AppContext from "../context/AppContext";
import ProtectedRoute from "./protectedRoutes";
import AdminProtectedRoute from "./adminProtectedRoutes";
import Market from "../pages/newAdmin/market";
import LandDetail from "../pages/newAdmin/landDetail";
import Chat from "../pages/newAdmin/chat";
import ScrollToTop from "../components/scrollToTop";
import Offers from "../pages/newAdmin/offers";
import CreateOffer from "../pages/newAdmin/createOffer";
import Contracts from "../pages/newAdmin/contracts";
import ContractDetail from "../pages/newAdmin/contractDetail";
import SellerLandDetail from "../pages/seller/landDetail";
import BuyerLandDetail from "../pages/buyer/landDetail";
import FContracts from "../pages/contracts/contracts";
import FContractDetail from "../pages/contracts/contractDetail";

export default function Routes() {
  const { loginUser, setLoginUser } = useContext(AppContext);

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <ProtectedRoute exact path="/bbuyer" component={Buyer} /> */}
        <ProtectedRoute exact path="/buy/:active_tab?" component={Buyer} />
        <ProtectedRoute exact path="/buy/bid/:bid_id" component={BuyerLandDetail} />
        <ProtectedRoute exact path="/bbuyer" component={newBuyer} />
        <ProtectedRoute exact path="/sell/:active_tab?" component={Seller} />
        <ProtectedRoute exact path="/sell/market_land/:land_id" component={SellerLandDetail} />
        <ProtectedRoute exact path="/offers" component={FOffers} />
        <ProtectedRoute exact path="/offers/detail/:offer_id" component={OfferDetail} />
        <ProtectedRoute exact path="/contracts" component={FContracts} />
        <ProtectedRoute exact path="/contracts/detail/:contract_id" component={FContractDetail} />
        
        <AdminProtectedRoute exact path="/admin/users" component={Admin} />
        <AdminProtectedRoute exact path="/admin/proposals" component={Market} />
        <AdminProtectedRoute
          exact
          path="/admin/proposals/detail/:land_id"
          component={LandDetail}
        />
        <AdminProtectedRoute exact path="/chats" component={Chat} />
        <AdminProtectedRoute exact path="/admin/offers" component={Offers} />
        <AdminProtectedRoute
          exact
          path="/admin/offers/create/:buyer_id"
          component={CreateOffer}
        />
        <AdminProtectedRoute exact path="/admin/contracts" component={Contracts} />
        <AdminProtectedRoute
          exact
          path="/admin/contracts/detail/:contract_id"
          component={ContractDetail}
        />
      </Switch>
    </Router>
  );
}
