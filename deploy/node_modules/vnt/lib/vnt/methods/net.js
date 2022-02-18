/*
    This file is part of vnt.js.

    vnt.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    vnt.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with vnt.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/** @file net.js
 * @authors:
 *   Marek Kotewicz <marek@ethdev.com>
 * @date 2015
 */

var utils = require('../../utils/utils');
var Property = require('../property');

var Net = function (vnt) {
    this._requestManager = vnt._requestManager;

    var self = this;

    properties().forEach(function(p) {
        p.attachToObject(self);
        p.setRequestManager(vnt._requestManager);
    });
};

/// @returns an array of objects describing vnt.core api properties
var properties = function () {
    return [
        new Property({
            name: 'listening',
            getter: 'net_listening'
        }),
        new Property({
            name: 'peerCount',
            getter: 'net_peerCount',
            outputFormatter: utils.toDecimal
        })
    ];
};

module.exports = Net;
