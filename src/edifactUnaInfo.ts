export default class EdifactUnaInfo {

    readonly compDataElementSeparator: string;
    readonly dataElementSeparator: string;
    readonly decimalNotation: string;
    readonly releaseCharacter: string;
    readonly reservedValue: string;
    readonly segmentTerminator: string;

    constructor(unaData: string) {
        if (!EdifactUnaInfo.isValidUnaData(unaData)) {
            throw new Error('UNA segment must be 9 characters long and prefixed with "UNA"');
        }
        this.compDataElementSeparator = unaData[3];
        this.dataElementSeparator = unaData[4];
        this.decimalNotation = unaData[5];
        this.releaseCharacter = unaData[6];
        this.reservedValue = unaData[7];
        this.segmentTerminator = unaData[8];
    }

    static readonly default = new EdifactUnaInfo("UNA:+.? '");

    static isValidUnaData(unaData: string) {
        return (unaData.length == 9 && unaData.startsWith('UNA'));
    }

    static determineFromEdifactData(edifactData: string) {
        const unaData = edifactData.trim().substr(0, 9);
        if (EdifactUnaInfo.isValidUnaData(unaData)) {
            return new EdifactUnaInfo(unaData);
        }
        else {
            return this.default;
        }
    }
}