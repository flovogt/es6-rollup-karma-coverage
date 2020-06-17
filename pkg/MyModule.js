var MyModule = (function () {
    'use strict';

    /**
     * @module
     * @author flovogt
     * @version ${version}
     * @since 0.0.1
     * @public
     */
    class MyModule {
        
        /**
         * @constructor
         * @public
         * @param {object} mParameters The parameters of MyModule
         * @param {string} [mParameters.sText="DummyText"] The text
         */
        constructor({sText="DummyText"} = {}){
            this.sText = sText;
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

    return MyModule;

}());
