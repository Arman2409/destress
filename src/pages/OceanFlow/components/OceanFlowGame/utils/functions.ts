import { collision, angle as getAngle, uniqueId, pointWithoutCollision, randomNumber, randomBoolean } from "pointscape"

import configs from "../../../../../configs/games/oceanFlow";
import {getVh, getVw} from "../../../../../utils/helpers/dimesions";
import type { FishSchool, OceanScene } from "../../../../../types/oceanFlow";
import type { Point } from "../../../../../types/shared";

const {
    collisionDistance,
    fishEachSchoolRange,
    fishSchoolRadius,
    plantsCountRange,
    extraX,
    extraY } = { ...configs };
const pi = Math.PI;
// Colors for the fish 
const randomFishColors = [
    0xFF0000, 0x00FF00, 0x0000FF, 0xFFCC00, 0x00FFCC,
    0xCC00FF, 0xFFFFFF, 0x000000, 0xABCDEF, 0xFF6347,
    0xB3EE3A, 0xDF0030, 0x0080FF, 0xEE82EE,
    0xFF00FF, 0xFFFF00, 0x4B0082, 0x000080,
    0x663399, 0x008000, 0xFFD700, 0xFFA500,
    0x00FF7F, 0x00FFFF, 0x87CEEB, 0x0000CD,
    0x4169E1, 0x8A2BE2, 0x9932CC, 0xBD82EE, 0xFF0090]

const getRandomFishColor = () => {
    return randomFishColors[randomNumber(0, randomFishColors.length)]
}

export const getRandomSchoolDetails = (width: number, height: number) => {
    let x: number, y: number, angle = 0;
    // define wheteher to start from sides or not 
    const fromSide = randomBoolean();
    if (fromSide) {
        const fromLeft = randomBoolean();
        const dirY = randomNumber(0, height);;
        let dirX = 0;
        y = randomNumber(0, height);
        if (fromLeft) {
            x = 0;
            dirX = width;
            angle = getAngle({ x, y }, { x: dirX, y: dirY })
        } else {
            x = width;
            angle = getAngle({ x, y }, { x: dirX, y: dirY });
        }
        return {
            x,
            y,
            dirY,
            dirX,
            angle
        }
    }
    // define wheteher to start from top or not 
    const fromTop = randomBoolean();
    const dirX = randomNumber(0, width);
    let dirY = 0;
    x = randomNumber(0, width);
    if (fromTop) {
        y = 0;
        dirY = height;
        angle = getAngle({ x, y }, { x: dirX, y: dirY })
    } else {
        y = height;
        angle = getAngle({ x, y }, { x: dirX, y: dirY })
    }
    return {
        x,
        y,
        dirX,
        dirY,
        angle
    }
}

export const getEscapeDirection = (width: number, height: number) => {
    let x = 0, y = 0;
    const extraSpace = 120;
    const toSide = randomBoolean();
    if (toSide) {
        const toLeft = randomBoolean();
        x = toLeft ? -extraSpace : width + extraSpace;
        y = randomNumber(0, height);
    }
    else {
        const toTop = randomBoolean();
        y = toTop ? -extraSpace : height + extraSpace;
        x = randomNumber(0, width);
    }
    return ({
        x,
        y
    })
}

export const checkForCollision = (scene: OceanScene, sysWidth: number, sysHeight: number, callback: Function) => {
    const { x = 0, y = 0 } = { ...scene.jellyfish }
    scene.fishSchools = scene.fishSchools.map((school: FishSchool) => {
        const { currentPosition = { x: 0, y: 0 }, fishCount = 1, fishes, escapingFrom } = { ...school }
        // checking if school already is escaping 
        if (escapingFrom) return { ...school };
        const { x: schoolX = 0, y: schoolY = 0 } = { ...currentPosition }
        // checking if is in the range to escape 
        if (collision({x, y}, {x: schoolX, y: schoolY}, collisionDistance)) {
            callback(fishCount);
            const escapeDirections = [];
            for (let i = 0; i < fishCount; i++) {
                const escapeDirection = getEscapeDirection(sysWidth, sysHeight);
                escapeDirections.push(escapeDirection);
                const { x: escapeX, y: escapeY } = { ...escapeDirection };
                const angle = getAngle({x: schoolX, y: schoolY},{x: escapeX, y: escapeY});
                let rotateFishIntervalRep = 0;
                const repeatance = randomNumber(1, 5);
                // interval to change the angle randomly several times and then to the needed angle
                const rotateInterval = setInterval(() => {
                    if (repeatance === rotateFishIntervalRep) {
                        fishes[i].setRotation(angle);
                        clearInterval(rotateInterval);
                        return;
                    }
                    rotateFishIntervalRep++;
                    fishes[i].setRotation(randomNumber(0, pi))
                }, 150)
            }
            return {
                ...school,
                escapingFrom: {
                    x: schoolX,
                    y: schoolY
                },
                escapeDirections
            }
        }
        return { ...school }
    })
}

export const addPlants = (scene: OceanScene) => {
    const plantsCount = Math.round(randomNumber(plantsCountRange[0], plantsCountRange[1]));
    const placeMents: Point[] = [];
    const { width, height } = scene.sys.cameras.main;
    for (let i = 1; i <= plantsCount; i++) {
        // geting random points for the plants 
        const { x, y } = pointWithoutCollision(0, width, 0, height, 75, placeMents);
        placeMents.push({ x, y });
        scene.add.sprite(x, y, "plantFrame").setScale(0.2).setDepth(1).setRotation(Math.random() * 6.24);
    }
}


const removeFishSchool = (school: FishSchool, scene: OceanScene) => {
    school.fishes.forEach((fish) => {
        fish.destroy();
    })
    clearInterval(school.interval as number);
    scene.fishSchools = scene.fishSchools.filter(({ id }: FishSchool) => {
        return id !== school.id;
    })
}

export const createRandomFishSchool = (scene: OceanScene, isLarge: boolean) => {
    const fishCount = Math.round(randomNumber(fishEachSchoolRange[0], fishEachSchoolRange[1]));
    const newSchool: FishSchool =
    {
        id: uniqueId(scene.fishSchools.map(({ id }: FishSchool) => id)),
        fishes: [],
        startingPoint: { x: 0, y: 0 },
        direction: { x: 0, y: 0 },
        currentPosition: { x: 0, y: 0 },
        fishCount,
        interval: [],
        escapingFrom: null,
        escapeDirections: []
    };
    const { width, height } = scene.sys.game.canvas;
    // get random direction for the school 
    let { x, y, dirX, dirY, angle } = getRandomSchoolDetails(width, height);

    for (let count = 0; count < fishCount; count++) {
        const scale = isLarge ? 0.075 : 0.035;
        const newFish = scene.add.sprite(x + randomNumber(0, fishSchoolRadius), y + randomNumber(0, fishSchoolRadius), "fishFrame1").setScale(scale);
        newFish.setRotation(angle).setDepth(1).setTint(getRandomFishColor());
        newSchool.fishes.push(newFish);
    }
    newSchool.startingPoint = { x, y }
    newSchool.currentPosition = { x, y }
    newSchool.direction = { x: dirX, y: dirY }
    let intervalRepeat = 0;
    newSchool.interval = setInterval(() => {
        if (intervalRepeat > 150) {
            removeFishSchool(newSchool, scene)
            return;
        }
        const school = scene.fishSchools.find(({ id }) => id === newSchool.id);
        const isEscaping = Boolean(school?.escapingFrom);
        if (isEscaping) {
            const { x: escapeX = 0, y: escapeY = 0 } = { ...school?.escapingFrom }
            x = escapeX;
            y = escapeY;
        }
        intervalRepeat++;
        const repeat = Math.round(randomNumber(10, 100));
        let xChange = (dirX - x) / repeat;
        let yChange = (dirY - y) / repeat;
        let { x: currentX = 0, y: currentY = 0 } = { ...school?.currentPosition };
        if (currentX < -300 || currentX > width + 300
            || currentY < -300 || currentY > height + 300) {
            removeFishSchool(newSchool, scene)
            return;
        }
        const currentPosition = {
            x: currentX += xChange,
            y: currentY += yChange,
        }
        // find the school in fishSchools and update the position 
        scene.fishSchools = scene.fishSchools.map((school) => {
            const { id = 0 } = { ...school };
            if (id === newSchool.id) {
                return ({
                    ...school,
                    currentPosition
                });
            }
            return { ...school };
        })
        // update the position for each fish 
        newSchool.fishes.forEach((fish: Phaser.GameObjects.Sprite, index: number) => {
            if (isEscaping) {
                const { x: dirX, y: dirY } = school?.escapeDirections[index] as Point;
                xChange = (dirX - x) / (repeat / 2);
                yChange = (dirY - y) / (repeat / 2);
            }
            fish.x += xChange;
            fish.y += yChange;
            fish.setTexture(`fishFrame${Math.round(randomNumber(1, 3))}`)
        })
    }, 50)
    scene.fishSchools.push(newSchool)
}


const extraXs = getVw(extraX);
const extraYs = getVh(extraY);

export const updateJellyfishDetails = (
    scene: OceanScene,
    type: "mouse" | "keypress",
    isLarge: boolean,
    rotation?: number,
    direction?: "x" | "y",
    stepX?: number,
    stepY?: number,
    step?: number,
    height?: number,
    width?: number,
) => {
    if (typeof rotation === "number") {
        scene.jellyfish.setRotation && scene.jellyfish.setRotation(rotation);
    }
    if (type === "keypress") {
        const limitDistance = isLarge ? 80 : 40;
        if (direction && step) {
            if (direction === "x") {
                if (!width && scene.jellyfish.x <= limitDistance) return;
                if (width && scene.jellyfish.x >= width - limitDistance) return;
                scene.jellyfish.x = scene.jellyfish.x + step;
            }
            if (direction === "y") {
                if (!height && scene.jellyfish.y <= limitDistance) return;
                if (height && scene.jellyfish.y >= height - limitDistance) return;
                scene.jellyfish.y = scene.jellyfish.y + step;
            }
        }
    }
    if (type === "mouse" && stepX && stepY && width && height) {
        if (!(stepX - 50 < 0
            || width - stepX < -60)) {
            scene.jellyfish.x = stepX - extraXs;
        }
        if (!(stepY - 50 < 0
            || height - stepY < -25)) {
            scene.jellyfish.y = stepY - extraYs;
        }
    }
}