import Home from "../pages/Home/Home";
import BounceFall from "../pages/BounceFall/BounceFall";
import OceanFlow from "../pages/OceanFlow/OceanFlow";
import Roshambo from "../pages/Roshambo/Roshambo";
import SynapseHash from "../pages/SynapseHash/SynapseHash";
// import VoidVoyage from "../pages/VoidVoyage/VoidVoyage";

export const routes = [
    {
        key: "home",
        path: "/",
        component: Home
    },
    {
        key: "synapseHash",
        path: "/synapseHash",
        component: SynapseHash
    },
    {
        key: "oceanFlow",
        path: "/oceanFlow",
        component: OceanFlow
    },
    {
        key: "roshambo",
        path: "/roshambo",
        component: Roshambo
    },
    {
        key: "bounceFall",
        path: "/bounceFall",
        component: BounceFall
    },
    // This game is disabled for now 
    // {
    //     key: "voidVoyage",
    //     path: "/voidVoyage",
    //     component: VoidVoyage
    // },
]