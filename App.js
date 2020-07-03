import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';


export default class App extends Component {

    constructor() {
        super();
        this.state = {
            resultText: "",
            calculationText: ""
        }
        this.operations = ['DEL', '+', '-', '*', '/']
    }

    calculateResult() {
        const text = this.state.resultText
        const lastChar = text.split('').pop()
        if (this.operations.indexOf(lastChar) > 0) return
        console.log(text, eval(text))
        this.setState({
            calculationText: eval(text),
            resultText : ''
        })
    }

    buttonPressed(text) {
        if (text == '=') {
            return this.calculateResult()
        }
        this.setState({resultText: this.state.resultText + text})
    }

    operate(operation) {
        switch (operation) {
            case 'DEL' :
                let text = this.state.resultText.split('')
                text.pop()
                this.setState({
                    resultText: text.join('')
                })
                break
            case '+':
            case '-':
            case '*':
            case '/':
                const lastChar = this.state.resultText.split('').pop()
                if (this.operations.indexOf(lastChar) > 0) return
                if (this.state.text == "") return
                this.setState({
                    resultText: this.state.resultText + operation
                })

        }
    }


    render() {
        let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
        let rows = []
        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])}
                                           style={styles.btn}>
                    <Text style={styles.btnText}>{nums[i][j]}</Text>
                </TouchableOpacity>)
            }
            rows.push(<View style={styles.row}>{row}</View>)
        }

        let ops = []
        for (let i = 0; i < this.operations.length; i++) {
            ops.push(<TouchableOpacity key={this.operations[i]} onPress={() => this.operate(this.operations[i])}
                                       style={styles.btn}>
                <Text style={styles.btnText}>{this.operations[i]}</Text>
            </TouchableOpacity>)
        }


        return (
            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style={styles.resultText}>{this.state.resultText}</Text>
                </View>
                <View style={styles.calculation}>
                    <Text style={styles.calculationText}>{this.state.calculationText}</Text>

                </View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                        {rows}
                    </View>
                    <View style={styles.operations}>
                        {ops}
                    </View></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    resultText: {
        fontSize: 30,
        color: 'white'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    calculationText: {
        fontSize: 24,
        color: 'white'
    },
    btnText: {
        fontSize: 30,
        color: 'white'
    },
    result: {
        flex: 2,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    calculation: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    buttons: {
        flexGrow: 7,
        flexDirection: 'row'
    },
    numbers: {
        flex: 3,
        backgroundColor: '#434343'
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    operations: {
        flex: 1,
        backgroundColor: '#636363',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
