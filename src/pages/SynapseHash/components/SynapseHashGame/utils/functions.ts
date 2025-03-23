import { uniqueId, randomNumber, angle as getAngle, distance, pointWithoutCollision, middle } from "pointscape";

import type { NetworkScene, Neuron } from "../../../../../types/synapseHash";
import configs from "../../../../../configs/synapseHash";

const {
  neuronsCountRange,
  electrifiedConnectionFramesCount,
  neuronDistanceBreakpoints
} = { ...configs }

const getNeuronTweenConfig = (target: any) => ({
  targets: [target],
  rotation: 360,
  duration: 120000,
  repeat: -1
})

const clickNeuron = (scene: NetworkScene, neuron: Neuron, callback: Function) => {
  const { sprite, id } = { ...neuron };
  if (scene.clickedNeuron) {
    const previousClicked = scene.clickedNeuron;
    const { id: prevId } = previousClicked;
    previousClicked.tween.destroy();
    let hasConnection = false;
    scene.neuronConnections.forEach((elem: any) => {
      if (elem.includes(id) && elem.includes(prevId)) {
        hasConnection = true;
      }
    })
    scene.clickedNeuron = {
      // adding rotating animation to the neuron 
      tween: scene.tweens.add(getNeuronTweenConfig(sprite)),
      ...neuron
    }
    if (hasConnection && scene.neuronConnections.length) {
      return;
    }
    scene.neuronConnections.push([prevId, id]);
    callback(scene.neuronConnections.length);
    const { x: startX = 0, y: startY = 0 } = { ...previousClicked.sprite };
    const { x: endX, y: endY } = { ...neuron.sprite };
    const angle = getAngle({x: startX, y: startY}, {x: endX, y: endY});
    const dist = distance({x: startX,  y: startY}, {x: endX, y: endY})
    const { x: middleX, y: middleY } = middle({x: startX, y: startY}, {x: endX, y: endY});

    // creating the connection sprite from one neuron to another 
    const newConnection = scene.physics.add.sprite(startX + middleX / 3, startY + middleY / 3, "connectionFrame")
      .setRotation(-Math.PI / 2 + angle)
      .setScale(dist * 0.0010, 1)
      .setDepth(1);
    scene.connectionSprites.push(newConnection);
    newConnection.anims.create({
      key: "neuronConnectionAnimation",
      frames: Array.from({ length: electrifiedConnectionFramesCount }, (_, order) => ({ key: "connectionElectrifiedFrame" + (order + 1) })),
      frameRate: 1,
      duration: 2,
      repeat: -1,
    })
    newConnection.anims.play("neuronConnectionAnimation")
    // timeout for changing the connections size until it reached to the next neuron 
    setTimeout(() => {
      newConnection.x = startX + middleX / 2;
      newConnection.y = startY + middleY / 2;
      newConnection.setScale(dist * 0.0015, 1)
      setTimeout(() => {
        newConnection.x = startX + middleX;
        newConnection.y = startY + middleY;
        newConnection.setScale(dist * 0.003, 1)
      }, 250)
      previousClicked.sprite.setRotation(-1.5 + angle);
    }, 250)
  } else {
    scene.clickedNeuron = {
      tween: scene.tweens.add(getNeuronTweenConfig(sprite)),
      ...neuron
    }
  }
  sprite.setTexture("neuronElectrifiedFrame");
}

export const addRandomNeurons = (scene: NetworkScene, size: "medium" | "large" | "veryLarge", clickCallback: Function, callback: Function) => {
  if (scene.sys?.cameras?.main) {
    const neuronsCount = Math.round(randomNumber(neuronsCountRange[0], neuronsCountRange[1]))
    const { width, height } = scene.sys?.cameras?.main || {};
    for (let i = 0; i < neuronsCount; i++) {
      const others = scene.neurons.map(({ placement }) => ({ ...placement }));
      // defining the distance between the neurons regarding the window's width 
      const distance = size === "veryLarge" ? neuronDistanceBreakpoints[2] : size === "large" ? neuronDistanceBreakpoints[1] : neuronDistanceBreakpoints[0];
      // generating random points for neurons 
      let { x, y } = pointWithoutCollision(distance, width - distance, distance, height - distance, distance, others);
      x = Math.round(x);
      y = Math.round(y);
      const scale = size === "veryLarge" ? 0.25 : 0.125;
      const newNeuronSprite = scene.physics.add.sprite(x, y, "neuronFrame")
        .setRotation(randomNumber(0, 6.24))
        .setScale(scale)
        .setDepth(2)
        .setInteractive();
      const newNeuron = {
        id: uniqueId(scene.neurons.map(({ id }: Neuron) => id)),
        placement: {
          x,
          y
        },
        sprite: newNeuronSprite,
      }
      scene.neurons.push(newNeuron);
      // set pointer events for the neuron 
      newNeuronSprite.on("pointerover", () => scene.input.setDefaultCursor("pointer"));
      newNeuronSprite.on("pointerout", () => scene.input.setDefaultCursor("default"));
      newNeuronSprite.on("pointerdown", () => clickNeuron(scene, newNeuron, clickCallback))
    }
    callback(neuronsCount);
  }
}