export const logsKeys = {
  getAll: [ 'getLogs', ],
  getById: (id: number) => [ 'getLogById', id, ],
  getBySearch: (search: string) => [ 'getLogsBySearch', search, ],
};
