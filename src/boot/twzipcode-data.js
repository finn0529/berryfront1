import twzipcode from 'twzipcode-data'

export const twzipcodeData = twzipcode()
export const twcounties = twzipcodeData.counties
export const twzipcodes = twzipcodeData.zipcodes
