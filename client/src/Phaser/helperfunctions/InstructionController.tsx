export const showInstruction = (scene: any, message: string) => {
  const screenCenterX = scene.cameras.main.worldView.centerX;
  const screenCenterY = scene.cameras.main.worldView.centerY;
  scene.textBox = scene.add
    .rectangle(screenCenterX, screenCenterY - 60, 320, 40, 0xffffff)
    .setVisible(true);
  scene.text = scene.add
    .text(screenCenterX, screenCenterY - 60, message, {
      fontFamily: 'Arial',
      color: '#000',
    })
    .setVisible(true)
    .setOrigin(0.5)
    .setFontSize(24);
  scene.text.setDepth(1);
};
export const hideInstruction = (scene: any) => {
  scene.textBox.setVisible(false);
  scene.text.setVisible(false);
}
