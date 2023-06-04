// import GUN from 'gun';

// //localStorage.clear();
// var gun = GUN({
//     peers: ['http://localhost:8075/gun']
// });

// gun.get('user').on((node) => {
//     console.log(node);
// });
import {initializeApp} from "firebase/app"
import {child, getDatabase, ref, get} from "firebase/database";

const firebasConfig = {
    databaseURL: "https://iot-testing-60517-default-rtdb.asia-southeast1.firebasedatabase.app/",
}

const app = initializeApp(firebasConfig);
const dbRef = ref(getDatabase(app), '/');

get(child(dbRef, `6 Wed May 24 2023 01:35:53 GMT+0530 (India Standard Time)`))
.then((snapshot) => {
    if (snapshot.exists()) {
        console.log("Success");
        console.log(snapshot.val());
    } else {
        console.log("No data available");
    }
})
.catch((error) => {
    console.log("Error");
});
