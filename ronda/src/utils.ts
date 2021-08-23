import { paramCase } from "change-case"
import { window, workspace } from "vscode"

export function getConfiguration(): NujasGenConfig {
  return <any>workspace.getConfiguration("ronda")
}

export function getProjectRoot() {
  if (workspace.workspaceFolders) {
    return workspace.workspaceFolders[0].uri.fsPath
  } else {
    return null
  }
}

type NujasGenConfig = {
  templateModule: string
  namespace: string
}

export async function getFeatureName() {
  const rawFeatureName = await window.showInputBox({
    prompt: `Name of the new feature you want to create.`,
    placeHolder: `dream-input, or dream-display . . .`
  })

  if (!rawFeatureName) {
    throw Error(`A name is required dummy. . . 👻`)
  }
  return paramCase(rawFeatureName)
}

export async function getFeaturePaths(
  featureName: string,
  sourcePath: string,
  featureDirectories = ["components", "hooks", "utils"]
) {
  const featureRootPath = `${sourcePath}/feature`
  const featurePath = `${featureRootPath}/${featureName}`

  return featureDirectories.reduce(
    (acc, c) => {
      acc[c] = `${featurePath}/${c}`
      return acc
    },
    {} as {
      [k: string]: string
    }
  )
  // export function getModuleIndex(
  //   pluginModules: Array<ModuleEntry>,
  //   srcModuleName: string
  // ) {
  //   const index = pluginModules.findIndex(({ Name }) => Name === srcModuleName);

  //   if (index === -1) {
  //     throw Error(`${srcModuleName} does not exist in uplugin ! ! ! 💩`);
  //   }

  //   return index;
}

// export function checkModuleExist(
//   pluginModules: Array<ModuleEntry>,
//   srcModuleName: string
// ) {
//   const moduleEntryExist = pluginModules.filter(
//     ({ Name }: ModuleEntry) => Name === srcModuleName
//   );

//   if (moduleEntryExist.length !== 0) {
//     throw Error(`${srcModuleName} already exists in uplugin ! ! ! 💩`);
//   }
// }

// export async function prepareModule(
//   pathOperation: Function,
//   pluginFilePath: string,
//   pluginFileJSON: any,
//   modulePaths: Array<String>
// ) {
//   const writePluginEntryPromise = writeJson(pluginFilePath, pluginFileJSON, {
//     spaces: "\t",
//   });
//   const pathOperationPromise = pathOperation.apply(null, modulePaths);
//   await Promise.all([writePluginEntryPromise, pathOperationPromise]);
// }
