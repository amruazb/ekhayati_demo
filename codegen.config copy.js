module.exports = [
  {
    source: "",
    from: 'openapi_3',
    output: 'src/api-types/pokemon-api', // pokemon-api
    urlMethodMapping: [
      ['get-pokemon-list/gen1', 'get', 'GetPokemonListGen1'],
      ['get-pokemon-list/gen2', 'get', 'GetPokemonListGen2', 'gateway/get-pokemon-list/gen2'],
    ],
    selectedOnly: true,
    modelNameMapping: [
      ['some.custom.model.naming', 'CustomModelNaming']
    ],
  },
  {
    // source: '<git repo> <branch name> <file to path>',
    source: 'ssh://git@github.com/pokemon/pokemon-api.git master -- docs/evolution-path.json',
    from: 'openapi_3',
    output: 'src/api-types/evolution-path', // evolution-path
  }, 
];