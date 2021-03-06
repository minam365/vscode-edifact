import EdifactUnaInfo from './edifactUnaInfo';

export default class EdifactFormatter {
    static format(edifactData: string) {
        const unaInfo = EdifactUnaInfo.determineFromEdifactData(edifactData);
        const rc = unaInfo.releaseCharacter;
        const st = unaInfo.segmentTerminator;

        // Append newlines after all non-escaped segment terminators
        const searchRegExp = new RegExp(`([^${rc}])${st}(?=.)`, 'g');
        const formattedData = edifactData.replace(searchRegExp, `$1${st}\n`);

        return formattedData
    }
}