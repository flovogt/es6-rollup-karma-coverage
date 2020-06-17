/**
 * @module
 * @author flovogt
 * @version ${version}
 * @since 0.0.1
 * @public
 */
export default class MyModule {
    
    /**
     * @constructor
     * @public
     * @param {object} mParameters The parameters of MyModule
     * @param {string} [mParameters.text="DummyText"] The text
     */
    constructor({text="DummyText"} = {}){
        this.sText = text;
    }

    /**
     * @public
     * @since 0.0.1
     * @returns {string} The text
     */
    getText(){
        return this.sText;
    }
}