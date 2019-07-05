const colorOptions = [
  {color: "#EF5350"},
  {color: "#FFA726"},
  {color: "#FFEE58"},
  {color: "#66BB6A"},
  {color: "#42A5F5"},
  {color: "#AB47BC"},
  {color: "white"}
];

function mySettings(props) {
  return (
    <Page>
      <Section title={<Text bold align="center">Arc settings</Text>}>
        <Toggle
          settingsKey="hourArc.visible"
          label="Show hour arc"
        />
        <Text>Hour arc color</Text>
        <ColorSelect
          settingsKey="hourArc.color"
          colors={colorOptions}
        />
        <Toggle
          settingsKey="minuteArc.visible"
          label="Show minute arc"
        />
        <Text>Minute arc color</Text>
        <ColorSelect
          settingsKey="minuteArc.color"
          colors={colorOptions}
        />
        <Toggle
          settingsKey="secondArc.visible"
          label="Show second arc"
        />
        <Text>Second arc color</Text>
        <ColorSelect
          settingsKey="secondArc.color"
          colors={colorOptions}
        />
      </Section>

      <Section title={<Text bold align="center">Tick settings</Text>}>
        <Toggle
            settingsKey="ticks.visible"
            label="Show ticks"
        />
        <Text>Tick color</Text>
        <ColorSelect
            settingsKey="ticks.color"
            colors={colorOptions}
        />
      </Section>

      <Section title={<Text bold align="center">Hand settings</Text>}>
        <Toggle
          settingsKey="hourHand.visible"
          label="Show hour hand"
        />
        <Text>Hour hand color</Text>
        <ColorSelect
          settingsKey="hourHand.color"
          colors={colorOptions}
        />
        <Toggle
          settingsKey="minuteHand.visible"
          label="Show minute hand"
        />
        <Text>Minute hand color</Text>
        <ColorSelect
          settingsKey="minuteHand.color"
          colors={colorOptions}
        />
        <Toggle
          settingsKey="secondHand.visible"
          label="Show second hand"
        />
        <Text>Second hand color</Text>
        <ColorSelect
          settingsKey="secondHand.color"
          colors={colorOptions}
        />
      </Section>

      <Section title={<Text bold align="center">Text settings</Text>}>
        <Toggle
          settingsKey="text.visible"
          label="Show text"
        />
        <Text>Text color</Text>
        <ColorSelect
          settingsKey="text.color"
          colors={colorOptions}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
