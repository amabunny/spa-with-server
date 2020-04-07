const recursive = require('recursive-readdir')
const path = require('path')
const fs = require('fs')

const PATH_TO_SERVER_DIST = '../packages/server/dist'
const ENTITIES_REGEX = /.*\.entity\.d.ts/
const IMPORT_REGEX = /from\s\'(.+)\'/g

/** Copy entites types to @types package from @server */
recursive(path.resolve(__dirname, PATH_TO_SERVER_DIST), [
  (file, stats) => {
    const isTypeDeclaration = ENTITIES_REGEX.test(file)

    if (stats.isDirectory()) {
      return false
    } else {
      return !isTypeDeclaration
    }
  }
], (error, files) => {
  const entitiesDirPath = path.resolve(__dirname, '../packages/types/src/entities')
  let reExportContent = ''

  files.forEach(file => {
    const fileName = path.basename(file).replace('.d.ts', '.ts')
    const dist = `${entitiesDirPath}/${fileName}`

    let fileContent = fs.readFileSync(file, { encoding: 'utf-8' })
      .replace(/declare/g, '')

    let importMatches = IMPORT_REGEX.exec(fileContent)

    while (importMatches !== null) {
      const [_, firstGroupMatch] = importMatches
      const importingFileName = path.basename(firstGroupMatch)

      fileContent = fileContent.replace(firstGroupMatch, `./${importingFileName}`)

      importMatches = IMPORT_REGEX.exec(fileContent)
    }

    fs.writeFileSync(dist, fileContent, { encoding: 'utf-8' })
    console.log('[Entity file copied]: ', dist)
    reExportContent += `export * from './${fileName.replace('.ts', '')}'\n`
  })

  const indexFilePath = `${entitiesDirPath}/index.ts`
  fs.writeFileSync(indexFilePath, reExportContent, { encoding: 'utf-8' })
  console.log('[Index file created]: ', indexFilePath)
})
