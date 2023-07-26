import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  Omit,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"

import MilhoSVG from "../../assets/icons/svgs/milho.svg"
import AmendoinSVG from "../../assets/icons/svgs/amendoin.svg"
import CogumeloSVG from "../../assets/icons/svgs/cogumelo.svg"
import CrustaceosSVG from "../../assets/icons/svgs/crustaceos.svg"
import FeijaoSVG from "../../assets/icons/svgs/feijao.svg"
import GergilimSVG from "../../assets/icons/svgs/gergilim.svg"
import GlutenSVG from "../../assets/icons/svgs/gluten.svg"
import LeiteSVG from "../../assets/icons/svgs/leite.svg"
import MariscosSVG from "../../assets/icons/svgs/mariscos.svg"
import MelSVG from "../../assets/icons/svgs/mel.svg"
import MostardaSVG from "../../assets/icons/svgs/mostarda.svg"
import NozesSVG from "../../assets/icons/svgs/nozes.svg"
import OvosSVG from "../../assets/icons/svgs/ovos.svg"
import PeixeSVG from "../../assets/icons/svgs/peixe.svg"
import SalsaSVG from "../../assets/icons/svgs/salsa.svg"
import SojaSVG from "../../assets/icons/svgs/soja.svg"
import SulfatoSVG from "../../assets/icons/svgs/sulfato.svg"
import EditSVG from "../../assets/icons/svgs/edit.svg"
import HeartSVG from "../../assets/icons/svgs/heart.svg"
import ArrowSVG from "../../assets/icons/svgs/arrow.svg"
import ArrowsSVG from "../../assets/icons/svgs/arrows.svg"
import BookLegalLawSVG from "../../assets/icons/svgs/book-legal-law.svg"
import BreadSVG from "../../assets/icons/svgs/bread.svg"
import ClockTimeMenuSVG from "../../assets/icons/svgs/clock-time-menu.svg"
import ClockTimeSVG from "../../assets/icons/svgs/clock-time.svg"
import CoffeeCupSVG from "../../assets/icons/svgs/coffee-cup.svg"
import JellyCakeSVG from "../../assets/icons/svgs/jelly-cake.svg"
import NivelSVG from "../../assets/icons/svgs/nivel.svg"
import RestaurantSVG from "../../assets/icons/svgs/restaurant.svg"
import TurkeySVG from "../../assets/icons/svgs/turkey.svg"
import UserGroupSVG from "../../assets/icons/svgs/user-group.svg"
import WeightDietSVG from "../../assets/icons/svgs/weight-diet.svg"

import { SvgProps } from "react-native-svg"

import { colors } from "../theme"

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

interface IconSVGProps extends Omit<IconProps, "color" | "style">, SvgProps {}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps | IconSVGProps) {
  const isPressable = !!props.onPress
  const Wrapper: ComponentType<TouchableOpacityProps> = props?.onPress ? TouchableOpacity : View

  const isSVG = typeof iconRegistry[props.icon] === "function"

  const IconSVG: React.FC<SvgProps> = isSVG ? iconRegistry[props.icon] : null
  const {
    icon,
    color = colors.palette.neutral100,
    size = 24,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props as typeof isSVG extends true ? IconSVGProps : IconProps

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      {isSVG ? (
        <IconSVG {...props} color={color} fontSize={size} width={size} height={size} />
      ) : (
        <Image
          {...props}
          style={[
            $imageStyle,
            color && { tintColor: color },
            size && { width: size, height: size },
            $imageStyleOverride,
          ]}
          source={iconRegistry[icon]}
        />
      )}
    </Wrapper>
  )
}

export const iconRegistry = {
  back: require("../../assets/icons/back.png"),
  bell: require("../../assets/icons/bell.png"),
  caretLeft: require("../../assets/icons/caretLeft.png"),
  caretRight: require("../../assets/icons/caretRight.png"),
  check: require("../../assets/icons/check.png"),
  clap: require("../../assets/icons/clap.png"),
  community: require("../../assets/icons/community.png"),
  components: require("../../assets/icons/components.png"),
  debug: require("../../assets/icons/debug.png"),
  github: require("../../assets/icons/github.png"),
  hidden: require("../../assets/icons/hidden.png"),
  ladybug: require("../../assets/icons/ladybug.png"),
  lock: require("../../assets/icons/lock.png"),
  menu: require("../../assets/icons/menu.png"),
  more: require("../../assets/icons/more.png"),
  pin: require("../../assets/icons/pin.png"),
  podcast: require("../../assets/icons/podcast.png"),
  settings: require("../../assets/icons/settings.png"),
  slack: require("../../assets/icons/slack.png"),
  view: require("../../assets/icons/view.png"),
  x: require("../../assets/icons/x.png"),
  apple: require("../../assets/icons/apple.png"),
  google: require("../../assets/icons/google.png"),
  user: require("../../assets/icons/user.png"),
  pen: require("../../assets/icons/pen.png"),
  // milho: require("../../assets/icons/milho.png"),
  // amendoin: require("../../assets/icons/amendoin.png"),
  // cogumelo: require("../../assets/icons/cogumelo.png"),
  // crustaceos: require("../../assets/icons/crustaceos.png"),
  // feijao: require("../../assets/icons/feijao.png"),
  // gergilim: require("../../assets/icons/gergilim.png"),
  // gluten: require("../../assets/icons/gluten.png"),
  // leite: require("../../assets/icons/leite.png"),
  // mariscos: require("../../assets/icons/mariscos.png"),
  // mel: require("../../assets/icons/mel.png"),
  // mostarda: require("../../assets/icons/mostarda.png"),
  // nozes: require("../../assets/icons/nozes.png"),
  // ovos: require("../../assets/icons/ovos.png"),
  // peixe: require("../../assets/icons/peixe.png"),
  // salsa: require("../../assets/icons/salsa.png"),
  // soja: require("../../assets/icons/soja.png"),
  // sulfato: require("../../assets/icons/sulfato.png"),

  // application
  edit: EditSVG,
  heart: HeartSVG,

  milho: MilhoSVG,
  amendoim: AmendoinSVG,
  cogumelo: CogumeloSVG,
  crustaceos: CrustaceosSVG,
  feijao: FeijaoSVG,
  gergelim: GergilimSVG,
  gluten: GlutenSVG,
  leite: LeiteSVG,
  mariscos: MariscosSVG,
  mel: MelSVG,
  mostarda: MostardaSVG,
  nozes: NozesSVG,
  ovos: OvosSVG,
  peixe: PeixeSVG,
  salsa: SalsaSVG,
  soja: SojaSVG,
  sulfato: SulfatoSVG,
}

const $imageStyle: ImageStyle = {
  resizeMode: "contain",
}
