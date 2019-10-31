import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { createField, EmailTemplateOptions } from '../helpers';
import { InputSwitchField } from './input-switch';
import { TextField } from './text';

const setores = [
  {
    guid: '809afead-0b65-4c25-888a-34241f25681d',
    nome: 'ASSESSORIA  ESPECIAL',
    sigla: '01022000003',
    nomeCurto: 'ASESP',
    tipoUnidade: {
      id: 56,
      descricao: 'ASSESSORAMENTO'
    },
    unidadePai: {
      guid: '44f43f0b-c994-4f3e-bd54-68903e6a6999',
      nome: 'DIRETORIA DA PRESIDENCIA',
      sigla: '01033900003',
      nomeCurto: 'DIPRE'
    }
  },
  {
    guid: '7c6cd98d-3d29-4b60-be25-574f897c6a61',
    nome: 'ASSESSORIA JURIDICA',
    sigla: '01022000002',
    nomeCurto: 'ASJUR',
    tipoUnidade: {
      id: 56,
      descricao: 'ASSESSORAMENTO'
    },
    unidadePai: {
      guid: '44f43f0b-c994-4f3e-bd54-68903e6a6999',
      nome: 'DIRETORIA DA PRESIDENCIA',
      sigla: '01033900003',
      nomeCurto: 'DIPRE'
    }
  },
  {
    guid: '4fa99409-ae7f-49a7-a6b5-fa823f065740',
    nome: 'CONSELHO DE ADMINISTRACAO',
    sigla: '01011200002',
    nomeCurto: 'CONAD',
    tipoUnidade: {
      id: 7,
      descricao: 'Conselho'
    },
    unidadePai: {
      guid: 'f36e4f4c-2e3d-4842-bf15-4fb3189e2332',
      nome: 'INST DE TECNOLOGIA DA INF E COMUNIC DO ESP SANTO',
      sigla: '01011200001',
      nomeCurto: 'PRODEST'
    }
  },
  {
    guid: '2df7bdd0-8ef5-420f-8096-273868b3b1d7',
    nome: 'DIRETORIA ADMINISTRATIVA E FINANCEIRA',
    sigla: '01033900001',
    nomeCurto: 'DIRAF',
    tipoUnidade: {
      id: 44,
      descricao: 'DIRETOR ADMIN'
    },
    unidadePai: {
      guid: '44f43f0b-c994-4f3e-bd54-68903e6a6999',
      nome: 'DIRETORIA DA PRESIDENCIA',
      sigla: '01033900003',
      nomeCurto: 'DIPRE'
    }
  },
  {
    guid: '44f43f0b-c994-4f3e-bd54-68903e6a6999',
    nome: 'DIRETORIA DA PRESIDENCIA',
    sigla: '01033900003',
    nomeCurto: 'DIPRE',
    tipoUnidade: {
      id: 43,
      descricao: 'PRESIDENCIA'
    },
    unidadePai: {
      guid: 'f36e4f4c-2e3d-4842-bf15-4fb3189e2332',
      nome: 'INST DE TECNOLOGIA DA INF E COMUNIC DO ESP SANTO',
      sigla: '01011200001',
      nomeCurto: 'PRODEST'
    }
  },
  {
    guid: '7ad7e14f-abea-4bbe-8ade-9b09b928dda0',
    nome: 'DIRETORIA TECNICA',
    sigla: '01033900002',
    nomeCurto: 'DITEC',
    tipoUnidade: {
      id: 45,
      descricao: 'DIRETOR TECNICO'
    },
    unidadePai: {
      guid: '44f43f0b-c994-4f3e-bd54-68903e6a6999',
      nome: 'DIRETORIA DA PRESIDENCIA',
      sigla: '01033900003',
      nomeCurto: 'DIPRE'
    }
  },
  {
    guid: 'e0f34818-b2f7-4d11-a9d9-3c616476c4a7',
    nome: 'GERENCIA DE ADMINISTRACAO GERAL',
    sigla: '01044700003',
    nomeCurto: 'GERAD',
    tipoUnidade: {
      id: 2,
      descricao: 'Gerência'
    },
    unidadePai: {
      guid: '2df7bdd0-8ef5-420f-8096-273868b3b1d7',
      nome: 'DIRETORIA ADMINISTRATIVA E FINANCEIRA',
      sigla: '01033900001',
      nomeCurto: 'DIRAF'
    }
  },
  {
    guid: '1fb54e73-b6d4-4f1e-85b4-87d510b5f664',
    nome: 'GERENCIA DE FINANCAS E ORCAMENTO',
    sigla: '01044700002',
    nomeCurto: 'GEFOR',
    tipoUnidade: {
      id: 2,
      descricao: 'Gerência'
    },
    unidadePai: {
      guid: '2df7bdd0-8ef5-420f-8096-273868b3b1d7',
      nome: 'DIRETORIA ADMINISTRATIVA E FINANCEIRA',
      sigla: '01033900001',
      nomeCurto: 'DIRAF'
    }
  },
  {
    guid: '0f67fcea-82dd-4aac-8f5c-0eebfd5dceea',
    nome: 'GERENCIA DE GESTAO DA INFORMACAO',
    sigla: '01044700005',
    nomeCurto: 'GEINF',
    tipoUnidade: {
      id: 2,
      descricao: 'Gerência'
    },
    unidadePai: {
      guid: '7ad7e14f-abea-4bbe-8ade-9b09b928dda0',
      nome: 'DIRETORIA TECNICA',
      sigla: '01033900002',
      nomeCurto: 'DITEC'
    }
  },
  {
    guid: '781569d1-c3d4-4937-ad72-91cf718b8170',
    nome: 'GERENCIA DE OPERACOES',
    sigla: '01044700006',
    nomeCurto: 'GEOPE',
    tipoUnidade: {
      id: 2,
      descricao: 'Gerência'
    },
    unidadePai: {
      guid: '7ad7e14f-abea-4bbe-8ade-9b09b928dda0',
      nome: 'DIRETORIA TECNICA',
      sigla: '01033900002',
      nomeCurto: 'DITEC'
    }
  },
  {
    guid: '2ae76549-c222-4d71-99fd-7c63c49ec6cd',
    nome: 'GERENCIA DE RECURSOS HUMANOS',
    sigla: '01044700001',
    nomeCurto: 'GEREH',
    tipoUnidade: {
      id: 2,
      descricao: 'Gerência'
    },
    unidadePai: {
      guid: '2df7bdd0-8ef5-420f-8096-273868b3b1d7',
      nome: 'DIRETORIA ADMINISTRATIVA E FINANCEIRA',
      sigla: '01033900001',
      nomeCurto: 'DIRAF'
    }
  },
  {
    guid: 'befcc67e-9234-4859-86a7-d8c4ae0bc7d3',
    nome: 'GERENCIA DE SISTEMAS DE INFORMACAO',
    sigla: '01044700004',
    nomeCurto: 'GESIN',
    tipoUnidade: {
      id: 2,
      descricao: 'Gerência'
    },
    unidadePai: {
      guid: '7ad7e14f-abea-4bbe-8ade-9b09b928dda0',
      nome: 'DIRETORIA TECNICA',
      sigla: '01033900002',
      nomeCurto: 'DITEC'
    }
  },
  {
    guid: 'ae2ee45d-72e9-46be-b074-ad436dcbeeaa',
    nome: 'GERENCIA DE SUPORTE',
    sigla: '01044700007',
    nomeCurto: 'GESUP',
    tipoUnidade: {
      id: 2,
      descricao: 'Gerência'
    },
    unidadePai: {
      guid: '7ad7e14f-abea-4bbe-8ade-9b09b928dda0',
      nome: 'DIRETORIA TECNICA',
      sigla: '01033900002',
      nomeCurto: 'DITEC'
    }
  },
  {
    guid: 'f36e4f4c-2e3d-4842-bf15-4fb3189e2332',
    nome: 'INST DE TECNOLOGIA DA INF E COMUNIC DO ESP SANTO',
    sigla: '01011200001',
    nomeCurto: 'PRODEST',
    tipoUnidade: {
      id: 43,
      descricao: 'PRESIDENCIA'
    }
  },
  {
    guid: '8bc2c5a7-dbdf-4e44-ba6d-7e40e058738c',
    nome: 'SECRETARIA EXECUTIVA',
    sigla: '01022000001',
    nomeCurto: 'SECEX',
    tipoUnidade: {
      id: 56,
      descricao: 'ASSESSORAMENTO'
    },
    unidadePai: {
      guid: '44f43f0b-c994-4f3e-bd54-68903e6a6999',
      nome: 'DIRETORIA DA PRESIDENCIA',
      sigla: '01033900003',
      nomeCurto: 'DIPRE'
    }
  },
  {
    guid: 'def5a6e0-dd50-46d5-ab73-b8426a17552d',
    nome: 'SUBGERENCIA DE ATENDIMENTO A CLIENTE',
    sigla: '01055500011',
    nomeCurto: 'SGCLI',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'befcc67e-9234-4859-86a7-d8c4ae0bc7d3',
      nome: 'GERENCIA DE SISTEMAS DE INFORMACAO',
      sigla: '01044700004',
      nomeCurto: 'GESIN'
    }
  },
  {
    guid: '4f217cd6-8148-4e2c-b61f-80dac8a7be4a',
    nome: 'SUBGERENCIA DE BANCO DE DADOS',
    sigla: '01055500025',
    nomeCurto: 'SGDBA',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'ae2ee45d-72e9-46be-b074-ad436dcbeeaa',
      nome: 'GERENCIA DE SUPORTE',
      sigla: '01044700007',
      nomeCurto: 'GESUP'
    }
  },
  {
    guid: '52379c2b-3832-481d-bfb1-7d31838c97b0',
    nome: 'SUBGERENCIA DE COMPRAS',
    sigla: '01055500005',
    nomeCurto: 'SGCOM',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'e0f34818-b2f7-4d11-a9d9-3c616476c4a7',
      nome: 'GERENCIA DE ADMINISTRACAO GERAL',
      sigla: '01044700003',
      nomeCurto: 'GERAD'
    }
  },
  {
    guid: '29c415f4-54df-4153-b7a3-a2462e619977',
    nome: 'SUBGERENCIA DE CONTABILIDADE',
    sigla: '01055500004',
    nomeCurto: 'SGCON',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: '1fb54e73-b6d4-4f1e-85b4-87d510b5f664',
      nome: 'GERENCIA DE FINANCAS E ORCAMENTO',
      sigla: '01044700002',
      nomeCurto: 'GEFOR'
    }
  },
  {
    guid: '06a711ef-4f51-42f3-9d9c-add0975c1457',
    nome: 'SUBGERENCIA DE CONTROLE DE QUALIDADE',
    sigla: '01055500020',
    nomeCurto: 'SGCTQ',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: '781569d1-c3d4-4937-ad72-91cf718b8170',
      nome: 'GERENCIA DE OPERACOES',
      sigla: '01044700006',
      nomeCurto: 'GEOPE'
    }
  },
  {
    guid: '747e24e2-61f3-4ed2-8cef-6f54071e6cfd',
    nome: 'SUBGERENCIA DE DATA WAREHOUSE',
    sigla: '01055500013',
    nomeCurto: 'SGDWH',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'befcc67e-9234-4859-86a7-d8c4ae0bc7d3',
      nome: 'GERENCIA DE SISTEMAS DE INFORMACAO',
      sigla: '01044700004',
      nomeCurto: 'GESIN'
    }
  },
  {
    guid: '2c5479a0-af9d-4721-b11c-1a35f19b5c80',
    nome: 'SUBGERENCIA DE DATACENTER',
    sigla: '01055500015',
    nomeCurto: 'SGDAT',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: '781569d1-c3d4-4937-ad72-91cf718b8170',
      nome: 'GERENCIA DE OPERACOES',
      sigla: '01044700006',
      nomeCurto: 'GEOPE'
    }
  },
  {
    guid: '7a7739d7-ab30-46d9-a30f-11952bd958bb',
    nome: 'SUBGERENCIA DE FINANCAS E ORCAMENTO',
    sigla: '01055500003',
    nomeCurto: 'SGFOR',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: '1fb54e73-b6d4-4f1e-85b4-87d510b5f664',
      nome: 'GERENCIA DE FINANCAS E ORCAMENTO',
      sigla: '01044700002',
      nomeCurto: 'GEFOR'
    }
  },
  {
    guid: '01edaf51-2acb-42a8-a2be-4198091010ad',
    nome: 'SUBGERENCIA DE HELP DESK',
    sigla: '01055500016',
    nomeCurto: 'SGHDK',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: '781569d1-c3d4-4937-ad72-91cf718b8170',
      nome: 'GERENCIA DE OPERACOES',
      sigla: '01044700006',
      nomeCurto: 'GEOPE'
    }
  },
  {
    guid: '68b5ef4b-fc41-4023-9732-2d6c6ae05da0',
    nome: 'SUBGERENCIA DE INTEGRACAO',
    sigla: '01055500027',
    nomeCurto: 'SGITG',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'befcc67e-9234-4859-86a7-d8c4ae0bc7d3',
      nome: 'GERENCIA DE SISTEMAS DE INFORMACAO',
      sigla: '01044700004',
      nomeCurto: 'GESIN'
    }
  },
  {
    guid: '797bfd1e-25f6-4e3a-9514-fb59fb865bc2',
    nome: 'SUBGERENCIA DE INTERNET',
    sigla: '01055500026',
    nomeCurto: 'SGINT',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'ae2ee45d-72e9-46be-b074-ad436dcbeeaa',
      nome: 'GERENCIA DE SUPORTE',
      sigla: '01044700007',
      nomeCurto: 'GESUP'
    }
  },
  {
    guid: '31ff0cb1-e21e-4577-b51e-e8535ed5418c',
    nome: 'SUBGERENCIA DE MANUTENCAO',
    sigla: '01055500010',
    nomeCurto: 'SGMAS',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'befcc67e-9234-4859-86a7-d8c4ae0bc7d3',
      nome: 'GERENCIA DE SISTEMAS DE INFORMACAO',
      sigla: '01044700004',
      nomeCurto: 'GESIN'
    }
  },
  {
    guid: '2db975bf-7754-4371-98d6-6c5c9b7d00af',
    nome: 'SUBGERENCIA DE MATERIAIS',
    sigla: '01055500006',
    nomeCurto: 'SGMAT',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'e0f34818-b2f7-4d11-a9d9-3c616476c4a7',
      nome: 'GERENCIA DE ADMINISTRACAO GERAL',
      sigla: '01044700003',
      nomeCurto: 'GERAD'
    }
  },
  {
    guid: '6e80da1e-875a-4d1f-bc42-7c30692f58ab',
    nome: 'SUBGERENCIA DE MONITORAMENTO',
    sigla: '01055500019',
    nomeCurto: 'SGMON',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: '781569d1-c3d4-4937-ad72-91cf718b8170',
      nome: 'GERENCIA DE OPERACOES',
      sigla: '01044700006',
      nomeCurto: 'GEOPE'
    }
  },
  {
    guid: '7d60179a-18c2-48bd-84f1-babd546354b7',
    nome: 'SUBGERENCIA DE PROJETOS',
    sigla: '01055500009',
    nomeCurto: 'SGPRJ',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'befcc67e-9234-4859-86a7-d8c4ae0bc7d3',
      nome: 'GERENCIA DE SISTEMAS DE INFORMACAO',
      sigla: '01044700004',
      nomeCurto: 'GESIN'
    }
  },
  {
    guid: '42aace7d-a02a-43d5-97be-17f86303c70d',
    nome: 'SUBGERENCIA DE SEGURANCA DA INFORMACAO',
    sigla: '01055500024',
    nomeCurto: 'SGSEG',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'ae2ee45d-72e9-46be-b074-ad436dcbeeaa',
      nome: 'GERENCIA DE SUPORTE',
      sigla: '01044700007',
      nomeCurto: 'GESUP'
    }
  },
  {
    guid: '08ad63c0-cf35-450b-90a2-fb2091765660',
    nome: 'SUBGERENCIA DE SERVICOS GERAIS',
    sigla: '01055500007',
    nomeCurto: 'SGAGE',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'e0f34818-b2f7-4d11-a9d9-3c616476c4a7',
      nome: 'GERENCIA DE ADMINISTRACAO GERAL',
      sigla: '01044700003',
      nomeCurto: 'GERAD'
    }
  },
  {
    guid: '5470659f-ff1d-467c-b867-b812a57634f8',
    nome: 'SUBGERENCIA DE SISTEMAS',
    sigla: '01055500008',
    nomeCurto: 'SGSIS',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'befcc67e-9234-4859-86a7-d8c4ae0bc7d3',
      nome: 'GERENCIA DE SISTEMAS DE INFORMACAO',
      sigla: '01044700004',
      nomeCurto: 'GESIN'
    }
  },
  {
    guid: 'de195f2f-94ee-40e5-b762-7ea44639955f',
    nome: 'SUBGERENCIA DE SISTEMAS DE INFORMACAO',
    sigla: '01055500014',
    nomeCurto: 'SGSIN',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: '0f67fcea-82dd-4aac-8f5c-0eebfd5dceea',
      nome: 'GERENCIA DE GESTAO DA INFORMACAO',
      sigla: '01044700005',
      nomeCurto: 'GEINF'
    }
  },
  {
    guid: '2c5edb03-8bce-4354-93cd-5bf6120df388',
    nome: 'SUBGERENCIA DE SOFTWARE BASICO',
    sigla: '01055500028',
    nomeCurto: 'SGSWB',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: 'ae2ee45d-72e9-46be-b074-ad436dcbeeaa',
      nome: 'GERENCIA DE SUPORTE',
      sigla: '01044700007',
      nomeCurto: 'GESUP'
    }
  },
  {
    guid: '06f635e1-2f03-4fab-b277-374aa6c2d382',
    nome: 'SUBGERENCIA DE TREINAMENTO',
    sigla: '01055500002',
    nomeCurto: 'SGTRE',
    tipoUnidade: {
      id: 3,
      descricao: 'Subgerência'
    },
    unidadePai: {
      guid: '2ae76549-c222-4d71-99fd-7c63c49ec6cd',
      nome: 'GERENCIA DE RECURSOS HUMANOS',
      sigla: '01044700001',
      nomeCurto: 'GEREH'
    }
  }
];

@Component({
  selector: 'formly-field-primeng-password',
  template: `
    SETOR
  `
})
// tslint:disable-next-line:component-class-suffix
export class SetorField extends FieldType {
  static create(key: string, templateOptions?: EmailTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      type: 'setor',
      label: 'Setor',
      placeholder: '',
      icon: 'fa-users',
      tooltip: ''
    };

    return createField('input', key, { ...defaults, ...templateOptions }, options);
  }

  static getEditForm = () => [
    TextField.create('label', {
      label: 'Label',
      placeholder: 'Label',
      required: true
    }),
    TextField.create('tooltip', {
      label: 'Tooltip',
      placeholder: '',
      required: false
    }),
    TextField.create('placeholder', {
      label: 'Placeholder',
      placeholder: 'Placeholder',
      required: false
    }),
    InputSwitchField.create('required', {
      label: 'Obrigatório?',
      placeholder: 'Obrigatório?',
      required: true
    })
  ];
}
