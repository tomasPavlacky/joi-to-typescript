import Joi from 'joi';

import { convertSchema, Settings } from '../index';

test('01.basic', () => {
  const schema = Joi.object({
    // basic types
    name: Joi.string()
      .optional()
      .description('Test Schema Name'),
    propertyName1: Joi.boolean().required(),
    dateCreated: Joi.date(),
    count: Joi.number()
  })
    .label('TestSchema')
    .description('a test schema definition');

  const result = convertSchema(({ sortPropertiesByName: true } as unknown) as Settings, schema);
  expect(result).not.toBeUndefined;
  expect(result?.content).toBe(`/**
 * a test schema definition
 */
export interface TestSchema {
  /**
   * count
   */
  count?: number;
  /**
   * dateCreated
   */
  dateCreated?: Date;
  /**
   * Test Schema Name
   */
  name?: string;
  /**
   * propertyName1
   */
  propertyName1: boolean;
}`);

  const schemaArray = Joi.object({
    // basic types
    name: Joi.array()
      .items(Joi.string())
      .optional(),
    propertyName1: Joi.array()
      .items(Joi.boolean())
      .required(),
    dateCreated: Joi.array().items(Joi.date()),
    count: Joi.array().items(Joi.number())
  })
    .label('ArrayObject')
    .description('an Array test schema definition');

  const arrayResult = convertSchema(({ sortPropertiesByName: true } as unknown) as Settings, schemaArray);
  expect(arrayResult).not.toBeUndefined;

  expect(arrayResult?.content).toBe(`/**
 * an Array test schema definition
 */
export interface ArrayObject {
  /**
   * count
   */
  count?: number[];
  /**
   * dateCreated
   */
  dateCreated?: Date[];
  /**
   * name
   */
  name?: string[];
  /**
   * propertyName1
   */
  propertyName1: boolean[];
}`);
});
