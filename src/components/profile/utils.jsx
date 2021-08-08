import {
  SiReact,
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiJavascript,
  SiJava,
  SiPython,
  SiLaravel,
  SiRedis,
  SiHtml5,
  SiCss3,
  SiCplusplus,
  SiC,
  SiKotlin,
  SiAngular,
  SiVueDotJs,
  SiGo,
  SiGodotengine,
  SiCsharp,
  SiTailwindcss,
  SiBootstrap,
  SiMongodb,
  SiDotNet,
  SiSpring,
} from 'react-icons/si'
import { FaNodeJs, FaPhp } from 'react-icons/fa'

const parsingTech = (string_of_techs) => {
  if (string_of_techs) {
    const array_of_ids = string_of_techs.split(',')
    return array_of_ids
  }
}

export const mappingTech = (tech_string) => {
  if (tech_string) {
    const mappedTechs = []
    const userTechs = parsingTech(tech_string)

    userTechs.map((tech) => {
      mappedTechs.push(defaultTechnologies[tech])
    })

    return mappedTechs
  }
}

const defaultTechnologies = {
  1: {
    icon: <SiReact size="3rem" />,
  },
  2: {
    icon: <SiDjango size="3rem" />,
  },
  3: {
    icon: <SiPostgresql size="3rem" />,
  },
  4: {
    icon: <SiPython size="3rem" />,
  },
  5: {
    icon: <SiJava size="3rem" />,
  },
  6: {
    icon: <SiJavascript size="3rem" />,
  },
  7: {
    icon: <FaNodeJs size="3rem" />,
  },
  8: {
    icon: <SiMysql size="3rem" />,
  },
  9: {
    icon: <SiLaravel size="3rem" />,
  },
  10: {
    icon: <SiRedis size="3rem" />,
  },
  11: {
    icon: <SiC size="3rem" />,
  },
  12: {
    icon: <SiCplusplus size="3rem" />,
  },
  13: {
    icon: <SiHtml5 size="3rem" />,
  },
  14: {
    icon: <SiJava size="3rem" />,
  },
  15: {
    icon: <SiKotlin size="3rem" />,
  },
  16: {
    icon: <SiCss3 size="3rem" />,
  },
  17: {
    icon: <SiAngular size="3rem" />,
  },
  18: {
    icon: <SiVueDotJs size="3rem" />,
  },
  19: {
    icon: <SiGo size="3rem" />,
  },
  20: {
    icon: <SiGodotengine size="3rem" />,
  },
  21: {
    icon: <SiCsharp size="3rem" />,
  },
  22: {
    icon: <SiTailwindcss size="3rem" />,
  },
  23: {
    icon: <SiBootstrap size="3rem" />,
  },
  24: {
    icon: <SiMongodb size="3rem" />,
  },
  25: {
    icon: <SiDotNet size="3rem" />,
  },
  25: {
    icon: <SiSpring size="3rem" />,
  },
}
